const CopyRight = () => {
    return (
        <div>
            <p className="hidden md:block text-xs text-center md:text-right xl:text-center text-gray-500 md:mr-10" style={{
            fontFamily: 'General Sans, sans-serif'
        }}>&copy; {new Date().getFullYear()} <a href="https://github.com/jespertjarnfors" target="_blank" rel="noreferrer">Jesper Tjarnfors.</a> All rights reserved.</p>
        </div>
    );
};

export default CopyRight;