const admin = '/admin';
const books = '/books';
const adminBooks = admin + '/books';

export const appRoutes = {
    admin: {
        LOGIN: `${admin}/login`,
        books: {
            LIST: `${adminBooks}`,
            ADD: `${adminBooks}/add`,
            EDIT: `${adminBooks}/edit`
        }
    },
    books: {
        LIST: `${books}`,
        DETAILS: `${books}/detail`
    }
}