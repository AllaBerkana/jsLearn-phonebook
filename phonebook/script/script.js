'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

{
  const createContainer = () => {
    const container = document.createElement('DIV');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('HEADER');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('H1');
    h1.classList.add('logo');
    h1.textContent = `The Fhone Book: ${title}`;
    return h1;
  };

  const createMain = () => {
    const main = document.createElement('MAIN');
    const mainContainer = createContainer();
    main.classList.add('main');
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonGroup = params => {
    const btnWrapper = document.createElement('DIV');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({ className, type, textContent }) => {
      const button = document.createElement('BUTTON');
      button.className = className;
      button.type = type;
      button.textContent = textContent;
      return button;
    });
    btnWrapper.append(...btns);
    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('TABLE');
    table.className = 'table table-striped';
    const thead = document.createElement('THEAD');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
          <th class="delete">Удалить</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Телефон</th>
      </tr>
    `);
    const tbody = document.createElement('TBODY');
    table.append(thead, tbody);
    table.tbody = tbody;
    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('DIV');
    overlay.className = 'form-overlay';

    const form = document.createElement('FORM');
    form.className = 'form';
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя</label>
        <input id="name" class="form-input" name="name" 
          type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия</label>
        <input id="surname" class="form-input" name="surname" 
          type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон</label>
        <input id="phone" class="form-input" name="phone" 
          type="number" required>
      </div>
    `);

    const btnClose = form.querySelector('.close');

    const buttonsGroup = createButtonGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        textContent: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        textContent: 'Отменить',
      },
    ]);

    form.append(...buttonsGroup.btns);
    overlay.append(form);
    return {
      overlay,
      form,
      btnClose,
    };
  };

  const createFooter = (title) => {
    const footer = document.createElement('FOOTER');
    footer.className = 'footer';
    const footerContainer = createContainer();
    footer.footerContainer = footerContainer;

    const p = document.createElement('P');
    const symbol = String.fromCharCode('0169');
    p.textContent = `Все права защищены ${symbol}${title}`;
    p.style.margin = '0px';
    footerContainer.append(p);
    footer.append(footerContainer);
    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();

    const buttonsGroup = createButtonGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        textContent: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        textContent: 'Удалить',
      },
    ]);

    const table = createTable();
    const form = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonsGroup.btnWrapper);
    app.append(header, main, table, form.overlay, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonsGroup.btns[0],
      formOverlay: form.overlay,
      form: form.form,
      btnClose: form.btnClose,
    };
  };

  const createRow = ({ name: firsname, surname, phone }) => {
    const tr = document.createElement('TR');

    const tdDel = document.createElement('TD');
    tdDel.className = 'delete';
    const buttonDel = document.createElement('BUTTON');
    buttonDel.className = 'del-icon';
    tdDel.append(buttonDel);
    const tdName = document.createElement('TD');
    tdName.textContent = `${firsname}`;

    const tdSurname = document.createElement('TD');
    tdSurname.textContent = `${surname}`;

    const tdPhone = document.createElement('TD');
    const phoneLink = document.createElement('A');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = `${phone}`;
    tdPhone.append(phoneLink);
    tr.phoneLink = phoneLink;
    tr.append(tdDel, tdName, tdSurname, tdPhone);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);
    const { list, logo, btnAdd, formOverlay, form, btnClose } = phoneBook;

    // functional
    const allRow = renderContacts(list, data);
    hoverRow(allRow, logo);

    btnAdd.addEventListener('click', () =>
      formOverlay.classList.add('is-visible'));
    btnClose.addEventListener('click', () =>
      formOverlay.classList.remove('is-visible'));
    form.addEventListener('click', event => event.stopPropagation());
    formOverlay.addEventListener('click', () =>
      formOverlay.classList.remove('is-visible'));
  };

  window.phoneBookInit = init;
}
