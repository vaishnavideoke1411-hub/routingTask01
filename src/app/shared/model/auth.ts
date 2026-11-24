export type userRole = 'buyer'|'admin'|'superAdmin'


export interface userLogin {
    email: string,
    password: string
}


export interface registerUser{
    name: string,
    email: string,
    password: string,
    userRole: userRole
}