/**
 * metadata to create the view user list table
 * */
export const userlistMetadata = {
  pagination: {
    type: 'text',
    position: 0,
    itemsPerPageLabel: 'Items Per Page',
    firstPageLabel: 'First Page',
    nextPageLabel: 'Next Page',
    lastPageLabel: 'Last Page',
    previousPageLabel: 'Previous Page'
  },
  filter: {
    type: 'text',
    position: 0,
    placeholder: 'Search',
    noData: 'There is no result to your search',
    anotherDate: ''
  },
  id: {
    type: 'text',
    position: 4,
    caption: 'ID'
  },
  avatar: {
    type: 'image',
    position: 1,
    caption: 'Profile Picture'
  },
  first_name: {
    type: 'text',
    position: 2,
    caption: 'First Name'
  },
  last_name: {
    type: 'text',
    position: 3,
    caption: 'Last Name'
  }
};
