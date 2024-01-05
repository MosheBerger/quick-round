export default function checkError(data) {
    if (data?.isError) { throw data }
}