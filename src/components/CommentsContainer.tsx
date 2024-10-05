const Comment = ({ comment }: { comment: any }) => {
    return (
        <>
            <div className="grid grid-flow-col items-center p-2 mt-5 bg-gray-200">
                <div className="col-span-1">
                    <img
                        alt="user-profile"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
                        className="h-10"
                    />
                </div>
                <div className="col-span-12 text-sm">
                    <h4 className="font-bold">{comment.name} hello</h4>
                    <h4>{comment.text}</h4>
                </div>
            </div>
            <div className="border-l">
                {comment.replies.map((comment: any) => {
                    return (
                        <div className="pl-5">
                            <Comment comment={comment} />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

const CommentList = ({ comments }: { comments: [] }) => {
    return (
        <>
            <h2>helloo</h2>
            {comments.map((comment) => {
                return (
                    <>
                        <Comment comment={comment} />
                    </>
                );
            })}
        </>
    );
};

const CommentsContainer = ({ data }: { data: any }) => {
    return (
        <div className="m-5 p-2 w-1/2">
            <h1 className="mb-2 font-bold text-lg">Comments:</h1>
            <CommentList comments={data} />
        </div>
    );
};

export default CommentsContainer;
