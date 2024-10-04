import {
  Flex,
  FormControl,
  IconButton,
  TextInput,
} from '@contentful/f36-components';
import { DeleteIcon } from '@contentful/f36-icons';
import tokens from '@contentful/f36-tokens';
import { Guide } from '../../locations/ConfigScreen';
import React from 'react';

interface GuideEditorProps {
  guide: Guide;
  onChange: (guide: Guide) => void;
  onRemove: (guide: Guide) => void;
}

export default function GuideEditor({
  guide,
  onChange,
  onRemove,
}: GuideEditorProps) {
  return (
    <div>
      <FormControl marginBottom="spacingM">
        <Flex gap={tokens.spacingXs} alignItems="center">
          {/* <FormControl.Label htmlFor="SwatchEditor">Guide</FormControl.Label> */}

          <TextInput
            name="GuideEditorName"
            placeholder="Guide name"
            size="small"
            value={guide.name}
            onChange={(e) => onChange({ ...guide, name: e.target.value })}
            isRequired
          />
          <TextInput
            name="GuideEditorURL"
            placeholder="Guide URL"
            size="small"
            value={guide.url}
            onChange={(e) => onChange({ ...guide, url: e.target.value })}
            id="GuideEditorColor"
            isRequired
          />
          <IconButton
            variant="transparent"
            size="small"
            aria-label="Remove color"
            onClick={() => onRemove(guide)}
            icon={<DeleteIcon variant="muted" />}
          />
        </Flex>
      </FormControl>
    </div>
  );
}
