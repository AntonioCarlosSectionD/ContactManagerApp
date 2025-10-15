// Sample contact data for demonstration or testing
export const sampleContacts = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-123-4567',
    company: 'Tech Corp',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    notes: 'Met at tech conference 2025',
    favorite: true,
    createdAt: new Date('2025-09-01').toISOString(),
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1-555-987-6543',
    company: 'Design Studio',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    notes: 'Graphic designer, potential collaboration',
    favorite: false,
    createdAt: new Date('2025-09-05').toISOString(),
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1-555-456-7890',
    company: 'Startup Inc',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    notes: 'Entrepreneur, interesting ideas',
    favorite: false,
    createdAt: new Date('2025-09-10').toISOString(),
  },
];

// Function to validate contact data before saving
export const validateContact = (contact) => {
  const errors = {};

  if (!contact.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!contact.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!contact.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
    errors.email = 'Email format is invalid';
  }

  if (!contact.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?[\d\s\-\(\)]+$/.test(contact.phone)) {
    errors.phone = 'Phone number format is invalid';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Helper function to format a contact's full name
export const formatContactName = (contact) => {
  return `${contact.firstName} ${contact.lastName}`.trim();
};

// Function to search contacts by name, email, or company
export const searchContacts = (contacts, searchTerm) => {
  if (!searchTerm.trim()) return contacts;

  const term = searchTerm.toLowerCase();

  return contacts.filter((contact) =>
    contact.firstName.toLowerCase().includes(term) ||
    contact.lastName.toLowerCase().includes(term) ||
    contact.email.toLowerCase().includes(term) ||
    contact.company.toLowerCase().includes(term)
  );
};
