export default function(message) {

    console.log('aaaa aa ' + NODE_ENV);
    if (NODE_ENV == 'development') {
        console.log(message);
    }

    alert(`welcome ${message}`);
};
