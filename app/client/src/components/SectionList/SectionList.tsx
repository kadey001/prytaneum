/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, ListSubheader, Avatar, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

export interface Datum {
    image?: string;
    title: string;
    subtitle: string;
    href: string;
}

export interface Section {
    title: string;
    sectionData: Datum[];
}

interface Props {
    sections: Section[];
}

/** SectionList returns a list of sections that display the corresponding Congressmembers and their pictures
 *  So you can have one section for a County and then their accompanying Congressmembers
 *  @category Component
 *  @constructor SectionList
 *  @param props
 *  @param {Section[]} props.sections consists of the Sections to iterate through <br><br> A Section consits of Title and a Datum[]
 */
export default function SectionList({ sections }: Props) {
    const theme = useTheme();
    const router = useRouter();

    return (
        <List style={{ width: '100%', height: '100%' }} subheader={<li />}>
            {sections.map(({ title, sectionData }) => (
                <li key={title} style={{ marker: 'none', backgroundColor: theme.palette.background.paper }}>
                    <ul style={{ backgroundColor: 'inherit', padding: 0, listStyle: 'none' }}>
                        <ListSubheader>{title}</ListSubheader>
                        <Divider component='li' />
                        {sectionData.map(({ image, title: listItemTitle, subtitle, href }, idx) => (
                            <li key={idx}>
                                <ListItem divider button onClick={() => router.push(href)}>
                                    {image && (
                                        <ListItemAvatar>
                                            <Avatar src={image} alt='Member of Congress Picture' />
                                        </ListItemAvatar>
                                    )}
                                    <ListItemText primary={listItemTitle} secondary={subtitle} />
                                </ListItem>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    );
}
