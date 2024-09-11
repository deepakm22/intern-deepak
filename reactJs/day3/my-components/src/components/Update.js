// import React, { useState } from 'react';

// function CounterComponent() {
//     const [count, setCount] = useState(0);

// return (
//     <div>
//     <h4>Count: {count}</h4>
//     <button onClick={() => setCount(prevCount => prevCount + 1)}>
//         Update Count 
//     </button>
//     </div>
// );
// }

// export default CounterComponent;


import React, { useState } from 'react';

function CounterComponent() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h4>Count: {count}</h4>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>
                Update Count
            </button>
        </div>
    );
}

export default CounterComponent;
