import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material/styles';

export interface Bill {
    name: string;
    summaryText: string;
}
interface Props {
    bill: Bill;
}

export default function BillSummary(props: Props) {
    const theme = useTheme();
    const { bill } = props;
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card sx={{ width: '100%' }} elevation={0}>
            <CardHeader
                title={
                    <>
                        <Typography sx={{ fontSize: '25px', fontWeight: theme.typography.fontWeightLight }}>
                            {bill.name}
                        </Typography>
                    </>
                }
                subheaderTypographyProps={{ sx: { fontWeight: theme.typography.fontWeightLight } }}
                action={<></>}
            />

            <CardActions disableSpacing>
                <IconButton
                    sx={{
                        transform: 'rotate(0deg)',
                        marginLeft: 'auto',
                        transition: theme.transitions.create('transform', {
                            duration: theme.transitions.duration.shortest,
                        }),
                        expandOpen: {
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        },
                    }}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                    size='large'
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <Typography paragraph>{bill.summaryText}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
