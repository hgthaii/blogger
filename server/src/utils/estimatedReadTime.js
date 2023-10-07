const caculatorEstimatedReadTime = (content) => {
    const wordsPerMinute = 200; // Trung bình 1 phút đọc được 200 từ
    const numberOfWords = content.split(/\s/g).length;
    const estimatedTime = Math.ceil(numberOfWords / wordsPerMinute);
    return estimatedTime;
};

export { caculatorEstimatedReadTime };
