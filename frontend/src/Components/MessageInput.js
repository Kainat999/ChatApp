// import React, { useState } from 'react'

// export default function MessageInput() {
//     const {inputValue, setinputValue} = useState('');

//     const handleInputChange = (event) => {
//         setinputValue(event.target.value)
//     }

//     const handleSendMessage = () => {
//         console.log("MESSAGE SEND")
//     }
//   return (
//     <div className='message-input'>
//         <textarea 
//             placeholder='Type your message'
//             value={inputValue}
//             onChange={handleInputChange}

//     />
//     <button onClick={handleSendMessage}>Send</button>
//     </div>
//   )
// }

import React, { useState } from 'react'

export default function MessageInput({ socket }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSendMessage = () => {
        if(socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                message: inputValue,
            }));
            setInputValue(''); 
        }
    }

    return (
        <div className='message-input'>
            <textarea 
                placeholder='Type your message'
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}
