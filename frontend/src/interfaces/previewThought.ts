interface IPreviewThought{
    title: string,
    topic: string,
    statement : string,
    tone : string | null,
    image : File | null,
    imageUrl : string,
    rawImageUrl? : string
}
export default IPreviewThought