export interface IVehicle {
    categoryName: string,
    features: string,
    fuelType: string,
    imagePath: string,
    isAvailableForRent: boolean,
    make: string,
    mileage: number,
    model: string,
    plateNumber: string,
    rentalPricePerDay: number,
    vehicleID: number,
    year: number
}

export interface IDeleteVehicle {
    message: string
}
