INSERT INTO department (name)
VALUES
    ('Executive Suite'),
    ('Finance'),
    ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
    ('CEO', 200000, 1),
    ('CTO', 175000, 1)
    ('Accountant', 90000, 2),
    ('Bookkeeper', 50000, 2)
    ('Senior Developer', 150000, 3),
    ('Junior Developer', 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Carolynn', 'Johnson', 1, NULL),
    ('Albert', 'Toto', 2, 1),
    ('Kevin', 'Baker', 6, 6),
    ('Angie', 'Smith', 4, 5),
    ('Susan', 'Kucha', 3, 1),
    ('Nashon', 'Wright' 5, 2);