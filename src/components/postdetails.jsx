import React, { useState } from 'react';
import { FaComment } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { BiSolidLike } from 'react-icons/bi';
import user from '../assets/images/user.png'; // Path to user image
import Sparkle from 'react-sparkle';
import { IoClose } from 'react-icons/io5';

const PostDetail = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { text: 'Great post!', id: 1, userPic: user },
    { text: 'Very informative, thanks for sharing.', id: 2, userPic: user },
  ]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);

  const reactions = [
    {
      type: 'like',
      user: 'Alok Sharma',
      bio: 'Software Engineer at ABC Corp.',
      location: 'New Delhi, India',
    },
    {
      type: 'heart',
      user: 'Priya Gupta',
      bio: 'Product Manager at XYZ Ltd.',
      location: 'Bangalore, India',
    },
    {
      type: 'like',
      user: 'Rohit Verma',
      bio: 'Data Scientist at DEF Inc.',
      location: 'Mumbai, India',
    },
    // Add more reactions with details as needed
  ];

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, { text: comment, id: Date.now(), userPic: user }]);
      setComment('');
      setShowCommentBox(false); // Close comment box after submitting
    }
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleLikeClick = () => {
    setShowSparkle(true);
    setLiked(!liked);
    setTimeout(() => setShowSparkle(false), 2000);
  };

  const openLikesModal = () => {
    setShowLikesModal(true);
  };

  const closeLikesModal = () => {
    setShowLikesModal(false);
  };

  const handleCancel = () => {
    setShowCommentBox(false);
  };
  

  const post = {
    title: 'Exploring the Beauty of Nature',
    content: `Nature is not only a place of beauty but also a source of inspiration and tranquility. From lush green forests to serene lakes and majestic mountains, nature has a way of captivating our senses and providing a sense of peace. In this post, we'll explore some of the most stunning natural landscapes and the impact they have on our well-being.`,
    image: 'https://c4.wallpaperflare.com/wallpaper/383/633/300/sybil-kailena-davina-e-sybille-y-sybil-a-hd-wallpaper-preview.jpg',
    date: '18 Aug 2024',
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-3 bg-white rounded-lg shadow-lg mt-3 mb-5 pt-0 border-gray">
      <div className="flex p-3 border-b border-gray-200">
        <img className="w-14 h-14 rounded-full mr-3" src={user} alt="User" />
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <h4 className="flex items-center text-lg font-semibold">Anurag Singh</h4>
            <button
              className={`ml-auto text-sm font-semibold mr-1 sm:mr-2 ${isFollowing ? 'text-gray-500' : 'text-blue-500'}`}
              onClick={toggleFollow}
            >
              {isFollowing ? 'Following' : 'Follow +'}
            </button>
          </div>
          <p className="text-sm text-gray-600">4th year student at NIT Jalandhar</p>
        </div>
      </div>
      {/* Post Content */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700">{post.content}</p>
      </div>
      {/* Post Image */}
      {post.image && (
        <div className="mb-4">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
      {/* Like & Comment Section */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="relative flex items-center text-gray-500 hover:text-gray-900"
          onClick={handleLikeClick}
        >
          {showSparkle && liked && (
            <Sparkle
              color="blue"
              count={30}
              minSize={7}
              maxSize={12}
              overflowPx={10}
              fadeOutSpeed={15}
            />
          )}
          <BiSolidLike className="text-2xl" style={{ color: `${liked ? 'blue' : 'grey'}` }} />
          <span>Like</span>
        </button>
        <button
          className="flex items-center text-gray-500 hover:text-gray-900"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <FaComment className="w-5 h-5 mr-1" />
          <span>Comment</span>
        </button>
      </div>
      {/* Like and Comment Counts */}
      <div className="flex items-center justify-between mb-4 text-gray-500">
        <div onClick={openLikesModal} className="cursor-pointer hover:text-gray-900">
          {reactions.length} Likes
        </div>
        <div>{comments.length} Comments</div>
      </div>
{/* Comments */}
{showCommentBox && (
  <div className="p-2 bg-gray-100 rounded-lg shadow-md">
    <div className="flex items-start mb-3">
      <img className="w-6 h-6 rounded-full bg-gray-400 mr-2" src={user} alt="User" />
      <textarea
        value={comment}
        onChange={handleCommentChange}
        rows="3"
        placeholder="Add a comment..."
        className="flex-grow p-1 border rounded-lg focus:outline-none"
      />
    </div>
    <div className="flex justify-end">
      <button
        onClick={handleCommentSubmit}
        className="bg-blue text-white py-2 px-3 rounded-lg flex items-center hover:bg-blue-700 mr-2"
      >
        <IoMdSend className="w-5 h-5 mr-1" />
        Send
      </button>
      <button
        onClick={handleCancel}
        className="bg-gray-300 text-black py-2 px-3 rounded-lg flex items-center hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  </div>
)}

      {/* Display Comments */}
      <div className="mt-6">
        <div className="text-lg font-semibold mb-2">Comments:</div>
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start p-2 border-b border-gray-200">
              <img className="w-10 h-10 rounded-full bg-gray-400 mr-3" src={c.userPic} alt="User" />
              <p className="text-gray-700">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Likes Modal */}
      {showLikesModal && (
        <div className="p-2 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-auto p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-lg">People who liked this post</h4>
              <button onClick={closeLikesModal}>
                <IoClose className="text-xl" />
              </button>
            </div>
            <div className="space-y-4">
              {reactions.map((reaction, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <img className="w-12 h-12 rounded-full bg-gray-400" src={user} alt="User" />
                  <div>
                    <span className="text-gray-900 font-medium">{reaction.user}</span>
                    <p className="text-gray-600 text-sm">{reaction.bio}</p>
                    <p className="text-gray-500 text-xs">{reaction.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
