const Container = ({ children }) => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 relative">
            {children}
        </div>
    );
};

export default Container;