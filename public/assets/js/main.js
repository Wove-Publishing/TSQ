(() => {
    'use strict';

    document.querySelectorAll('.nav-list a').forEach(link => {
        if (
            new URL(link.href).pathname.replace(/\/$/, '') ===
            location.pathname.replace(/\/$/, '')
        ) {
            link.setAttribute('aria-current', 'page');
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;

        const open = [
            ...document.querySelectorAll('.primary-nav details[open]')
        ].reverse();

        if (open[0]) {
            open[0].open = false;
            open[0].querySelector('summary').focus();
        }
    });

    document.addEventListener('click', event => {
        document.querySelectorAll('.writing-menu[open]').forEach(menu => {
            if (!menu.contains(event.target)) {
                menu.open = false;
            }
        });
    });

    document.querySelectorAll('.kg-gallery-image img').forEach(img => {
        const width = Number(img.getAttribute('width'));
        const height = Number(img.getAttribute('height'));

        if (width && height) {
            img.parentElement.style.flex = `${width / height} 1 0%`;
        }
    });

    /* Dark mode toggle */
    const themeToggle = document.querySelector('.theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const html = document.documentElement;

            if (html.classList.contains('dark-mode')) {
                html.classList.remove('dark-mode');
                localStorage.setItem('tsq-theme', 'light');
            } else {
                html.classList.add('dark-mode');
                localStorage.setItem('tsq-theme', 'dark');
            }
        });
    }

    /* Floating Support TSQ tab — hidden on the Donate page */
    const currentPath = location.pathname.replace(/\/+$/, '') || '/';

    if (currentPath !== '/donate') {
        const supportTab = document.createElement('a');
        supportTab.className = 'support-tab';
        supportTab.href = '/donate/';
        supportTab.setAttribute('aria-label', 'Support The Scandinavian Quarterly');
        supportTab.textContent = 'Support TSQ →';
        document.body.append(supportTab);
    }

    /* Contributor directory */
    const directory = document.querySelector('.directory');

    if (!directory) return;

    const entries = [...directory.querySelectorAll('[data-name]')];

    if (!entries.length) return;

    const tools = document.querySelector('.directory-tools');
    const input = tools.querySelector('input');
    const alphabet = tools.querySelector('.alphabet');

    const collator = new Intl.Collator('sv', {
        sensitivity: 'base'
    });

    const normalize = value =>
        value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase();

    entries
        .sort((a, b) => collator.compare(a.dataset.name, b.dataset.name))
        .forEach(entry => directory.append(entry));

    const initial = entry =>
        [...entry.dataset.name.trim().toLocaleUpperCase('sv')][0];

    let selected = 'All';

    const initials = [...new Set(entries.map(initial))].sort(collator.compare);

    ['All', ...initials].forEach(letter => {
        const button = document.createElement('button');

        button.type = 'button';
        button.textContent = letter;

        button.setAttribute(
            'aria-pressed',
            String(letter === 'All')
        );

        button.addEventListener('click', () => {
            selected = letter;
            update();
        });

        alphabet.append(button);
    });

    function update() {
        const query = normalize(input.value.trim());
        let count = 0;

        entries.forEach(entry => {
            const visible =
                (selected === 'All' || initial(entry) === selected) &&
                normalize(entry.dataset.name).includes(query);

            entry.hidden = !visible;

            if (visible) {
                count++;
            }
        });

        alphabet.querySelectorAll('button').forEach(button => {
            button.setAttribute(
                'aria-pressed',
                String(button.textContent === selected)
            );
        });

        tools.querySelector('.directory-count').textContent =
            `${count} ${count === 1 ? 'contributor' : 'contributors'}`;

        document.querySelector('.directory-empty').hidden = count !== 0;
    }

    input.addEventListener('input', update);

    tools.hidden = false;

    update();
})();