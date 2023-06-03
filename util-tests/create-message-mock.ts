/**
 * 
 */
export default function createMessageMock({ channel = {}, author = {} } = {}) {
 return {
  channel: {
   id: createMessageMock.channelId = (Math.floor(Math.random() * 1000)),
   ...channel
  },
  author: {
   id: createMessageMock.messageId = (Math.floor(Math.random() * 10000)),
   ...author
  }
 }
}

createMessageMock.channelId = 0;
createMessageMock.messageId = 0;