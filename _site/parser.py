import json
import csv

#EmojiNet

# data = json.load(open('data/emojinet.json'))
#
# def combine(data):
#     output = ""
#     for item in data:
#         output += ",".join(list(item.values())[0])
#     return output
#
# header = ["category", "keywords", "definition", "unicode", "name", "shortcode", "adjaectives", "nouns", "verbs"]
# with open('data/emojinet.csv', 'w+') as f:
#     writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
#     writer.writerow(header)
#     for record in data:
#         row = [
#             record['category'],
#             ",".join(record['keywords']),
#             record['definition'],
#             record['unicode'],
#             record['name'],
#             record['shortcode'],
#             combine(record['senses']['adjectives']),
#             combine(record['senses']['nouns']),
#             combine(record['senses']['verbs']),
#         ]
#         writer.writerow(row)
#
#
# #EmoSim508
data = json.load(open('data/emosim508.json'))

header = ["emojiPairId", "emojiOne unicodelong", "emojiOne unicodeshort", "emojiOne title", "emojiTwo unicodelong", "emojiTwo unicodeshort", "emojiTwo title", \
          "emojiPairSimilarity Google_Sense_Label",
          "emojiPairSimilarity Twitter_Sense_Def",
          "emojiPairSimilarity Google_Sense_All",
          "emojiPairSimilarity Google_Sense_Def",
          "emojiPairSimilarity Google_Sense_Desc",
          "emojiPairSimilarity Twitter_Sense_All",
          "emojiPairSimilarity Twitter_Sense_Desc",
          "emojiPairSimilarity Twitter_Sense_Label",
          "emojiPairSimilarity Human_Annotator_Agreement",
          ]
with open('data/emosim508.csv', 'w+') as f:
    writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(header)
    for record in data:
        row = [
            record['emojiPairId'],
            record['emojiPair']["emojiOne"]["unicodelong"],
            record['emojiPair']["emojiOne"]["unicodeshort"],
            record['emojiPair']["emojiOne"]["title"],
            record['emojiPair']["emojiTwo"]["unicodelong"],
            record['emojiPair']["emojiTwo"]["unicodeshort"],
            record['emojiPair']["emojiTwo"]["title"],
            record['emojiPairSimilarity']["Google_Sense_Label"],
            record['emojiPairSimilarity']["Twitter_Sense_Def"],
            record['emojiPairSimilarity']["Google_Sense_All"],
            record['emojiPairSimilarity']["Google_Sense_Def"],
            record['emojiPairSimilarity']["Google_Sense_Desc"],
            record['emojiPairSimilarity']["Twitter_Sense_All"],
            record['emojiPairSimilarity']["Twitter_Sense_Desc"],
            record['emojiPairSimilarity']["Twitter_Sense_Label"],
            record['emojiPairSimilarity']["Human_Annotator_Agreement"],
        ]
        writer.writerow(row)

DATA = {}

for record in data:
    e1 = record['emojiPair']["emojiOne"]["unicodeshort"]
    e2 = record['emojiPair']["emojiTwo"]["unicodeshort"]
    score = record['emojiPairSimilarity']["Human_Annotator_Agreement"]
    if e1 in DATA:
        DATA[e1].append({e2: score})
    else:
        DATA[e1] = [{e2: score}]
    if e2 in DATA:
        DATA[e1].append({e1: score})
    else:
        DATA[e2] = [{e1: score}]

with open('data/emosim508.txt', 'w+') as g:
    json.dump(DATA, g)