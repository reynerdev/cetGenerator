export const fetchData = async (props = {}) => {

  return new Promise((resolve, reject) => {

    const { contentful, contentType, id, include, query } = props;
    const { client } = contentful;
    const request = id ? client.getEntry(id, { include, ...query }) : client.getEntries({ 'content_type': contentType, include, ....query })
    const a = "hola"

  })

}

