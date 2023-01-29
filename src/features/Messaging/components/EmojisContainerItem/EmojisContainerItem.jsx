import React from "react";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import "./style.css";


const EmojisContainerItem = ({ emojisListRef, emojisList, emojiSearchValue, updateEmojiSearchValue, handleAddEmoji }) => {
    return <>
        <div className='all__Emojis__Container' ref={emojisListRef}>
            <SearchBar searchValue={emojiSearchValue} updateSearchValue={updateEmojiSearchValue} />
            <div className='emojis__Content'>
                {
                    React.Children.toArray(emojisList.map(row => {
                        return <div className='emoji__Row'>
                            {
                                React.Children.toArray(row.map(emojiItem => {
                                    return <div className='emoji' onClick={() => handleAddEmoji(emojiItem.emoji)}>{emojiItem.emoji}</div>
                                }))
                            }
                        </div>
                    }))
                }
            </div>
        </div>
    </>
}

export default EmojisContainerItem;
