from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import datetime

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)



class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text)
    date = db.Column(db.Date, default=datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

@app.route('/add', methods=['POST'])
def add_article():
    title = request.json.get("title")
    body = request.json.get("body")

    if not title or not body:
        return jsonify({"error": "Title and body are required"}), 400
    # Creating the Articles object
    article = Articles(title=title, body=body)

    # Adding the article to the session and committing
    db.session.add(article)
    db.session.commit()

    # Returning the serialized article
    return article_schema.jsonify(article), 201

@app.route('/articles', methods=['GET'])
def get_articles():
    all_articles = Articles.query.all()
    result = articles_schema.dump(all_articles)
    return jsonify(result)

# Get a single todo item by id
@app.route('/articles/<id>', methods=['GET'])
def get_article(id):
    article = Articles.query.get(id)
    if not article:
        return jsonify({"error": "Article not found"}), 404
    return article_schema.jsonify(article)

# Update a todo item by id
@app.route('/articles/<id>', methods=['PUT'])
def update_article(id):
    article = Articles.query.get(id)
    if not article:
        return jsonify({"error": "Article not found"}), 404

    title = request.json.get("title")
    body = request.json.get("body")

    if title:
        article.title = title
    if body:
        article.body = body

    db.session.commit()
    return article_schema.jsonify(article)

# Delete a todo item by id
@app.route('/articles/<id>', methods=['DELETE'])
def delete_article(id):
    article = Articles.query.get(id)
    if not article:
        return jsonify({"error": "Article not found"}), 404

    db.session.delete(article)
    db.session.commit()
    return jsonify({"message": "Article deleted successfully"}), 204

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)