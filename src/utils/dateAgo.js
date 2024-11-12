function timeAgo(isoDate) {
    const date = new Date(isoDate);
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);

    const units = [
        { label: 'y', seconds: 31536000 },
        { label: 'mo', seconds: 2592000 },
        { label: 'd', seconds: 86400 },
        { label: 'h', seconds: 3600 },
        { label: 'min', seconds: 60 },
        { label: 's', seconds: 1 }
    ];

    for (let unit of units) {
        const count = Math.floor(secondsAgo / unit.seconds);
        if (count > 0) {
            return `${count} ${unit.label} ago`;
        }
    }

    return 'just now';
}
export {timeAgo};
