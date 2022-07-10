import httpService from "./http.service"

const todosEndPoint = "todos/"
const todosService = {
    fetch: async () => {
        const { data } = await httpService.get(todosEndPoint, {
            params: {
                _page: 1,
                _limit: 10
            }
        })
        return data
    },
    post: async (task) => {
        const { data } = await httpService.post(todosEndPoint, task)
        return data
    }
}
export default todosService