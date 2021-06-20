export const filterByName = (friends, filterText) => {
  filterText = filterText.toLowerCase().trim()

  if (filterText === '') {
    return friends
  }

  return friends.filter(friend => {
    const friendName = friend.userName.toLowerCase()

    const regexp = /(\S+)\s+(\S+)/
    const friendNameParts = friendName.match(regexp)

    const filterCond = friendNameParts[1].startsWith(filterText) ||
      friendNameParts[2].startsWith(filterText)

    return filterCond
  })
}

export const filterAndSortMessages = (userMessages, user, selectedFriend) => {
  const filterMessages = userMessages.filter(message => {
    if (message.from === user.id) {
      message.author = 'Вы'
    } else if (message.from === selectedFriend.id) {
      message.author = selectedFriend.userName
    }

    const filterCond = (message.to === user.id && message.from === selectedFriend.id) ||
      (message.to === selectedFriend.id && message.from === user.id)

    return filterCond
  })

  const sortMessages = filterMessages.sort((leftMessage, rightMessage) => {
    return +leftMessage.date > +rightMessage.date ? 1 :
      +leftMessage.date < +rightMessage.date ? -1 : 0
  })

  return sortMessages
}
