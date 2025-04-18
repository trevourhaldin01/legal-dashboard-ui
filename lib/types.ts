export interface Case {
    id:number
    name:string
    description:string
    status:string
};

export interface Document {
    id: number
    title: string
    version: string
    updatedAt: string
    updatedBy: string
}

export interface TimeEntry {
    id: number
    name: string
    role: string
    hours: number
}