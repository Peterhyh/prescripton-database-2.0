const useRefreshToken = () => {

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true //allows to send cookies with requests
        })
    };

    return (
        <article>

        </article>
    )
};

export default useRefreshToken;