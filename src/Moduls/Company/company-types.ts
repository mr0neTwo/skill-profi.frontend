import {ICON} from "../../Common/icons";

export type Company = {
    name: string
    email: string
    phoneNumber: string
    address: string
    directorName: string
    mapLink: string
}

export type UpdateCompanyDto = {
    name: string
    email: string
    phoneNumber: string
    address: string
    directorName: string
    mapLink: string
}

export type SocialMedia = {
    id: number
    iconName: keyof typeof ICON
    link: string
}

export type UpdateSocialMediaDto = {
    socialMediaDtos: SocialMedia[]
}