import sampleData from '../data/samplePosts.json';

const addTimestamps = (posts) => {
  return posts.map(post => ({
    ...post,
    date: new Date().toISOString(),
    lastModified: new Date().toISOString()
  }));
};

const samplePosts = addTimestamps(sampleData.posts);

export const postService = {
  async getPosts() {
    return Promise.resolve(samplePosts);
  },

  async createPost(post) {
    const newPost = {
      ...post,
      id: `sample-${samplePosts.length + 1}`,
      date: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      authorId: this.getCurrentUserId()
    };
    samplePosts.unshift(newPost);
    return Promise.resolve(newPost);
  },

  async updatePost(id, updates) {
    const index = samplePosts.findIndex(post => post.id === id);
    if (index !== -1) {
      samplePosts[index] = {
        ...samplePosts[index],
        ...updates,
        lastModified: new Date().toISOString()
      };
      return Promise.resolve(samplePosts[index]);
    }
    throw new Error('Post not found');
  },

  async deletePost(id) {
    const index = samplePosts.findIndex(post => post.id === id);
    if (index !== -1) {
      samplePosts.splice(index, 1);
      return Promise.resolve();
    }
    throw new Error('Post not found');
  },

  getCurrentUserId() {
    return 'sample1';
  },

  clearPosts() {
    // Do nothing
  }
}; 