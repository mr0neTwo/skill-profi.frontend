import {z} from "zod"
import {ICON} from "../../Common/icons"

export const CompanySchema = z.object({
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    directorName: z.string(),
    mapLink: z.string(),
})

export const UpdateCompanyDtoSchema = z.object({
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    directorName: z.string(),
    mapLink: z.string(),
})

export const SocialMediaSchema = z.object({
    id: z.number().int(),
    iconName: z.enum(Object.keys(ICON) as [keyof typeof ICON]),
    link: z.string()
})

export const UpdateSocialMediaDtoSchema = z.object({
    socialMediaDtos: z.array(SocialMediaSchema)
})