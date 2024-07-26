import React, { useState } from 'react'

import type { CharacterModel } from 'lib/store/character'

import { Text, Input, Button } from '@mantine/core'
import type { ContextModalProps } from '@mantine/modals'

type NameModalProps = ContextModalProps<{
  character: CharacterModel
}>

export const NameModal: React.FC<NameModalProps> = ({
  context,
  id,
  innerProps
}) => {
  const [nameInput, setNameInput] = useState(innerProps.character.name)
  const [loading, setLoading] = useState(false)

  const submit = () => {
    setLoading(true)

    try {
      innerProps.character.updateName(nameInput)
      context.closeModal(id)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const nameError = nameInput.length === 0 || nameInput.length > 32

  return (
    <>
      <Input.Wrapper label="Name">
        <Input
          value={nameInput}
          onChange={e => setNameInput(e.currentTarget.value)}
          error={nameError}
        />
      </Input.Wrapper>
      <Text size="sm" mt="md">
        Edit and save name of the character locally. All your changes will
        persist in current browser.
      </Text>

      <Button
        onClick={submit}
        fullWidth
        mt="md"
        loading={loading}
        disabled={nameError}>
        Save
      </Button>
    </>
  )
}
