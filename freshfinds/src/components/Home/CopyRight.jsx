const CopyRight = () => {
    return (
        <div>
            <p className="text-xs text-center md:text-right xl:text-center text-gray-500 md:mr-10" style={{
            fontFamily: 'General Sans, sans-serif'
        }}>&copy; {new Date().getFullYear()} Jesper Tjarnfors. All rights reserved.</p>
        </div>
    );
};

export default CopyRight;