export interface ILink {
    to: string
    dataKey: string
    rootPathLength : number
    orientation: 'horizontal' | 'vertical'
    editable?: boolean
}