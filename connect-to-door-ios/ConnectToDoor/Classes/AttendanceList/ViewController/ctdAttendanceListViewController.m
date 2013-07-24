//
//  ctdAttendanceListViewController.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/16/13.
//  Copyright (c) 2013 muhammad amirul. All rights reserved.
//

#import "ctdAttendanceListViewController.h"
#import "ctdConstants.h"
#import "ctdAttendanceTableViewCell.h"
#import "ctdColorUtilities.h"
#import "ctdSummaryAttendanceModel.h"

@implementation ctdAttendanceListViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self showActivityIndicator];
    ctdAttendanceListService *attendanceListService = [[ctdAttendanceListService alloc] init];
    [attendanceListService handleAttendanceListRequest:nil :nil :@"01-07-2013" :@"15-07-2013"];
    attendanceListService.delegate = self;
}

-(void)viewWillAppear:(BOOL)animated
{
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

-(void)didReceiveAttendanceListResponse:(NSMutableArray *)attendanceListArray
{
    [self hideActivityIndicator];
    attendanceContentArray = attendanceListArray;
    [attendanceTableView reloadData];
    
}

- (void)didReceiveAttendanceListErrorResponse:(NSError*)error;
{
    [self hideActivityIndicator];
    NSLog(@"ERROR RESPONSE : %@", error);
}

#pragma mark UITableViewDelegate

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;    //count of section
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    
    return [attendanceContentArray count];    //count number of row from counting array hear cataGorry is An Array
}

- (UITableViewCell *)tableView:(UITableView *)tableView
         cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSString *MyIdentifier = [NSString stringWithFormat:@"MyIdentifier %i", indexPath.row];
    
    ctdAttendanceTableViewCell *cell = (ctdAttendanceTableViewCell *)[attendanceTableView dequeueReusableCellWithIdentifier:MyIdentifier];
    
    if (cell == nil) {
        NSArray *topLevelObjects = [[NSBundle mainBundle] loadNibNamed:@"ctdAttendanceTableViewCell" owner:self options:nil];
        cell = [topLevelObjects objectAtIndex:0];
    }
    
    if( [indexPath row] % 2 == 0){
        [cell.contentView setBackgroundColor:[ctdColorUtilities colorWithHexString:@"FFFFFF"]];
    }else{
        [cell.contentView setBackgroundColor:[ctdColorUtilities colorWithHexString:@"cfe9d0"]];
    }
    
    ctdSummaryAttendanceModel *data = [attendanceContentArray objectAtIndex:indexPath.row];
    
    UILabel *numberLabel = [[UILabel alloc] initWithFrame:CGRectMake(0.0, 0, 33.0,tableView.rowHeight)];
    [cell addColumn:50];
    numberLabel.font = [UIFont systemFontOfSize:12.0];
    numberLabel.text = [NSString stringWithFormat:@"%d.", indexPath.row + 1];
    numberLabel.textColor = [UIColor blackColor];
    numberLabel.textAlignment = NSTextAlignmentCenter;
    numberLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:numberLabel];
    
    UIImageView *separator = [[UIImageView alloc] initWithFrame:CGRectMake(34.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:60];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *nameLabel =  [[UILabel alloc] initWithFrame:CGRectMake(38, 0, 146.0,tableView.rowHeight)];
    [cell addColumn:70];
    nameLabel.font = [UIFont systemFontOfSize:12.0];
    nameLabel.text = data.employeeName;
    nameLabel.textColor = [UIColor blackColor];
    nameLabel.textAlignment = NSTextAlignmentLeft;
    nameLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:nameLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(181.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:80];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *employeeIdLabel =  [[UILabel alloc] initWithFrame:CGRectMake(185.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:90];
    employeeIdLabel.font = [UIFont systemFontOfSize:12.0];
    employeeIdLabel.text = data.employeeId;
    employeeIdLabel.textColor = [UIColor blackColor];
    employeeIdLabel.textAlignment = NSTextAlignmentCenter;
    employeeIdLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:employeeIdLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(272.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:100];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *projectIdLabel =  [[UILabel alloc] initWithFrame:CGRectMake(274.0, 0, 88.0,tableView.rowHeight)];
    [cell addColumn:110];
    //  label.tag = VALUE_TAG;
    projectIdLabel.font = [UIFont systemFontOfSize:12.0];
    // add some silly value
    projectIdLabel.text = data.projectId;
    projectIdLabel.textColor = [UIColor blackColor];
    projectIdLabel.textAlignment = NSTextAlignmentCenter;
    projectIdLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:projectIdLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(362.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:120];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *totalAttendanceLabel =  [[UILabel alloc] initWithFrame:CGRectMake(365.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:130];
    totalAttendanceLabel.font = [UIFont systemFontOfSize:12.0];
    totalAttendanceLabel.text = data.totalAttendance;
    totalAttendanceLabel.textColor = [UIColor blackColor];
    totalAttendanceLabel.textAlignment = NSTextAlignmentCenter;
    totalAttendanceLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:totalAttendanceLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(452.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:140];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *totalWorkingLabel =  [[UILabel alloc] initWithFrame:CGRectMake(454.0, 0, 88.0,tableView.rowHeight)];
    [cell addColumn:150];
    totalWorkingLabel.font = [UIFont systemFontOfSize:12.0];
    totalWorkingLabel.text = data.totalWorking;
    totalWorkingLabel.textColor = [UIColor blackColor];
    totalWorkingLabel.textAlignment = NSTextAlignmentCenter;
    totalWorkingLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:totalWorkingLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(543.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:160];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *totalLeaveLabel =  [[UILabel alloc] initWithFrame:CGRectMake(546.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:170];
    totalLeaveLabel.font = [UIFont systemFontOfSize:12.0];
    totalLeaveLabel.text = data.totalLeave;
    totalLeaveLabel.textColor = [UIColor blackColor];
    totalLeaveLabel.textAlignment = NSTextAlignmentCenter;
    totalLeaveLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:totalLeaveLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(633.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:180];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *averageWorkingLabel =  [[UILabel alloc] initWithFrame:CGRectMake(635.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:190];
    averageWorkingLabel.font = [UIFont systemFontOfSize:12.0];
    averageWorkingLabel.text = data.averageWorkingHour;
    averageWorkingLabel.textColor = [UIColor blackColor];
    averageWorkingLabel.textAlignment = NSTextAlignmentCenter;
    averageWorkingLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:averageWorkingLabel];
    
    return cell;
    
    
}



@end
