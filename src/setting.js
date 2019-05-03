export const app = {
    // App
    name: 'Shopping',
    key: 'Shopping',
    description: 'Sistema de tienda online.',
    version: '0.1.5',
    uri: 'https://shopping.paulantezana.com',

    // author
    author: 'PaulAntezana',
    authorUri: 'https://paulantezana.com',

    // Contact
    facebook: 'https://www.facebook.com/Paulantezana-764145183607069/inbox',
    youtube: 'https://www.youtube.com/channel/UCwnGqfqlVjDxRZJ-pFjP2oQ?view_as=subscriber',
    twitter: 'https://twitter.com/paulantezana',
};

export const docProperties = {
    pageSize: 'A4',
    author: app.author,
    creator: app.author,
    fontSize: 10,
    font: 'Roboto',
};

export const service = {
    path: 'http://localhost:1323',
    api_path: 'http://localhost:1323/api/v1',
    socket: 'ws://localhost:1323/ws',
};