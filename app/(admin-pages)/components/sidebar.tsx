import { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex bg-blue-200 h-full">
            <div style={{ width: isOpen ? '200px' : '0', transition: 'width 0.3s', overflow: 'hidden' }}>
                <button onClick={toggleSidebar}>
                    {isOpen ? 'Hide' : 'Show'}
                    click here
                </button>
                {isOpen && (
                    <nav>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </nav>
                )}
            </div>
            <div style={{ marginLeft: isOpen ? '200px' : '0', transition: 'margin-left 0.3s' }}>
                <h1>Content Area</h1>
                <button onClick={toggleSidebar}>
                    {isOpen ? 'Hide' : 'Show'}
                    click
                </button>
                <p>This is the main content area.</p>
            </div>
        </div>
    );
};

export default Sidebar;