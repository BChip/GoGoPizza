from flask import Flask
from flask import request
app = Flask(__name__)

import turicreate as tc
import json
import sys

@app.route("/users", methods=['GET'])
def users():
    sf = tc.load_sframe("toppings")
    return str(list(set(sf.to_dataframe()['user_id'].values))).replace("'","\"")


@app.route("/recommend", methods=['GET'])
def recommend():
    users = request.args.getlist('users')
    num = int(request.args.get('num'))
    sf = tc.load_sframe("toppings")
    m = tc.recommender.create(sf, target='rating')
    recs=m.recommend(users=users, exclude_known=False, k=num)
    print(recs)
    return recs.to_dataframe().to_json()


@app.route("/traintoppings", methods=['POST'])
def traintoppings():
    content = request.json
    userid = content.get('userid')
    scores = content.get('scores')
    data = content.get('data')
    sf = tc.SFrame({'user_id': ([userid]*len(scores)), 'item_id': data, 'rating': scores})
    try:
        osf = tc.load_sframe("toppings")
        sf = sf.append(osf)
    except Exception:
        pass
    sf.save("toppings")
    m = tc.recommender.create(sf, target='rating')
    recs=m.recommend(exclude_known= False)

    return recs.to_dataframe().to_json()


@app.route("/traincrust", methods=['POST'])
def traincrust():
    content = request.json
    userid = content.get('userid')
    scores = content.get('scores')
    data = content.get('data')
    sf = tc.SFrame({'user_id': ([userid]*len(scores)), 'item_id': data, 'rating': scores})
    try:
        osf = tc.load_sframe("crust")
        sf = sf.append(osf)
    except Exception:
        pass
    sf.save("crust")
    m = tc.recommender.create(sf, target='rating')
    recs=m.recommend(exclude_known= False)

    return recs.to_dataframe().to_json()


if __name__ == '__main__':
    app.run(host='0.0.0.0')