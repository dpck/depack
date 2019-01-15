const v8 = require('v8')

export default v8
export const {
  'DefaultDeserializer': DefaultDeserializer,
  'DefaultSerializer': DefaultSerializer,
  'Deserializer': Deserializer,
  'Serializer': Serializer,
  'cachedDataVersionTag': cachedDataVersionTag,
  'deserialize': deserialize,
  'getHeapSpaceStatistics': getHeapSpaceStatistics,
  'getHeapStatistics': getHeapStatistics,
  'serialize': serialize,
  'setFlagsFromString': setFlagsFromString,
} = v8