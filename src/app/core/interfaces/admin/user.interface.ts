export interface IUser {
    createdAt: string
    email: string
    firstName: string
    imagePath: string
    isActive: boolean
    lastName: string
    phoneNumber: string
    role: string
    roleId: number
    userId: number
    driverLicenseNumber: string
}

export interface IResponseDeleteUser{
    message:string
}
