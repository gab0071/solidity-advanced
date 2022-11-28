import React from 'react';

const MyFooter = () => (
    <footer
        style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}
        className="text-center text-lg-start text-muted"
    >
        <div className="text-center p-4 bg-dark text-white">
            © 2022 Copyright: 
            <a
                className="text-reset fw-bold text-white"
                href="https://github.com/gab0071"
            > CatellaTech
            </a>
        </div>
    </footer>
);

export default MyFooter;
