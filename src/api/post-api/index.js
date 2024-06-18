import instance from '..';

const PostAPI = {
  viewPostsAPI: (viewPostsData) => {
    return instance.get('posts', {
      params: {
        title: viewPostsData,
        page: 0,
        size: 8,
        sort: 'createdAt-desc',
      },
    });
  },

  viewPostDetailAPI: (viewPostDetailData) => {
    return instance.get(`post/${viewPostDetailData}`);
  },
  viewClothesAPI: (viewClothesData) => {
    return instance.get(`products?product-name=${viewClothesData}`);
  },
  recommendPostAPI: (recommendPostData) => {
    return instance.patch(`posts/${recommendPostData}`);
  },
  modifyPostAPI: (modifyPostData) => {
    return instance.put('posts', modifyPostData);
  },
  writePostAPI: (writePostData) => {
    return instance.post('posts', writePostData);
  },
  removePostAPI: (removePostData) => {
    return instance.delete(`users/posts/${removePostData}`);
  },
};

export default PostAPI;
