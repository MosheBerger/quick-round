export default function checkError(data) {
    if (data?.isError) { throw new Error(data.message) }
}