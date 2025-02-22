const API_URL = 'https://your-backend-api.com'; // Replace with your actual backend API URL

export interface ForumPost {
    id: string;
    author: string;
    content: string;
}

export const fetchForumPosts = async (): Promise<ForumPost[]> => {
    // Replace with your actual API endpoint
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const createForumPost = async (post: Omit<ForumPost, 'id'>): Promise<ForumPost> => {
    // Replace with your actual API endpoint
    const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const requestHomeCollection = async (request: any): Promise<any> => {
    const response = await fetch(`${API_URL}/collection-requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const fetchUserPoints = async (userId: string): Promise<number> => {
    const response = await fetch(`${API_URL}/users/${userId}/points`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};
