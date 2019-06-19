const blogs = [
  {
    title: 'Blogien testausta',
    author: 'joku',
    url: 'osoite',
    likes: 14,
    user: {
      username: 'test',
      name: 'Teppo Testaaja',
      id: '5cf5023aba69c93754d6deba'
    },
    id: '5cff98e95263ba2488f16713'
  },
  {
    title: 'toinen',
    author: 'tuntematon',
    url: 'www.odd.co',
    likes: 7,
    user: {
      username: 'test',
      name: 'Teppo Testaaja',
      id: '5cf5023aba69c93754d6deba'
    },
    id: '5cf8e75ab81ada12f8064cb0'
  },
  {
    title: 'JSX is easy',
    author: 'David Abramov',
    url: 'www.kaleva.fi',
    likes: 7,
    user: {
      username: 'antjuntu',
      name: 'Antti',
      id: '5cffa1115263ba2488f16714'
    },
    id: '5cffa1b75263ba2488f16716'
  }
]

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { setToken, getAll }