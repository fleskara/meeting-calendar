const BaseService = () => {

    const get = <T> (url: string): Promise<T> => {
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json());
    }


    const post = <T> (url: string, data: T) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }


    const put = <T>(url: string, data: T) => {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }


    const baseDelete = (url: string) => {
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return { get, post, put, delete: baseDelete }
}

export default BaseService();
