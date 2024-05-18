export const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <footer className="Footer-Landing">
            {`Simple List™ ${currentYear}`}{" "}
            <div>
                <a
                    href="https://linkedin.com/in/michał-kaszkiel-11mk11"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i class="fa-brands fa-linkedin"></i>
                </a>
                <a
                    href="https://github.com/michalkaszkiel11"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i class="fa-brands fa-github"></i>
                </a>
            </div>
        </footer>
    );
};
