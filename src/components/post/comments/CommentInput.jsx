import { useState } from 'react';

//creating comment box, from Medium.com
class CommentBox extends Component{
    render(){
        const { commentValue, handleCommentValue, enterCommentLine, submitCommentLine} = this.props;
        const enableCommentButton = () => {
            return (commentValue ? false :true);
        }

        const changeCommentButtondStyle = () =>{
            return (commentValue ? "comments-button-enabled" : "comments-button-disabled");
        }

        return(
            <div className = "comments-box">
                <input onKeyPress={enterCommentLine} value={commentValue}
                id="comments-input" onChange={handleCommentValue} type="text" placeholder="Add a comment..."/>"

                <button onClick={submitCommentLine} type="submit" className= "comments-button"
                id={changeCommentButtondStyle()} disabled={enableCommentButton()}>Post</button>
            </div>

        )
    }
}