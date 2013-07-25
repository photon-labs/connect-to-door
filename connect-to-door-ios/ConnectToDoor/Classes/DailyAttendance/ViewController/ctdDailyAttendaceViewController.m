//
//  ctdDailyAttendaceViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdDailyAttendaceViewController.h"
#import "ctdSelectViewDailyAttendanceCell.h"
#import "ctdLocalStorage.h"
#import "ctdDailyAttendanceService.h"
#import "ctdDailyAttendanceParser.h"
#import "ctdResponseDailyAttendanceModel.h"
#import "ctdResponseDailyAttendanceListModel.h"
#import "ctdColorUtilities.h"

@interface ctdDailyAttendaceViewController ()

@end

@implementation ctdDailyAttendaceViewController

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
    dateView.frame = CGRectMake(400, 120, dateView.frame.size.width, dateView.frame.size.height);
    [self.view addSubview:dateView];
    [self configureAllComponent];
    [self requestDailyAttendance:[self getEmployeeId] date:dateString];
    // Do any additional setup after loading the view from its nib.
}

-(void)requestDailyAttendance:(NSString*)employeeID date:(NSString*)date{
    ctdDailyAttendanceService *dailyAttendanceService = [[ctdDailyAttendanceService alloc]init];
    dailyAttendanceService.delegate = self;
    //NSString *employeeId= employeeId;
    //[self saveEmployeeIdtoLocalStorage:employeeId];
   // NSLog(@"EMPLOYEE ID == %@",employeeId);
    //NSLog(@"FACEBOOK ID == %@",[self getFacebookId]);
    [dailyAttendanceService requestDailyAttendanceToServer:employeeID date:date];
}

- (void)configureAllComponent{
     NSDate *today = [NSDate date];
     dateString = [self paternDateForRequest:today];
    dateView.hidden = TRUE;
    datePicker.hidden = TRUE;
    toolbarDatePicker.hidden = TRUE;

    UIView *paddingView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 5, 20)];
    dateTxt.leftView = paddingView;
    dateTxt.leftViewMode = UITextFieldViewModeAlways;
}



-(NSString*)getEmployeeId{
    ctdLocalStorage *local = [[ctdLocalStorage alloc] init];
    return (local.getEmployeeId)?local.getEmployeeId:@"";
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(NSString*)paternDateForRequest:(NSDate*)dateRequest{
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy-MM-dd"];
    [formatter setTimeZone:[NSTimeZone timeZoneWithName:@"..."]];
    NSString *stringFromDate = [formatter stringFromDate:dateRequest];
    NSLog(@"DATE ===== %@",stringFromDate);

    return stringFromDate;
}

#pragma mark UITableViewDelegate methods

-(NSInteger) numberOfSectionsInTableView:(UITableView *)tableView
{
        return 1;
}

-(NSInteger) tableView:(UITableView *)table numberOfRowsInSection:(NSInteger)section
{
    
    return [model.getDailyAttendanceListModels count];/*[dataChartTypeArray count]*/;

}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *CellIdentifier = @"attendanceCell";
    ctdSelectViewDailyAttendanceCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        NSArray *topLevelObjects = [[NSBundle mainBundle] loadNibNamed:@"ctdSelectViewDailyAttendanceCell" owner:self options:nil];
        cell = [topLevelObjects objectAtIndex:0];
        
    }

    if( [indexPath row] % 2 == 0){
        [cell.contentView setBackgroundColor:[ctdColorUtilities colorWithHexString:@"FFFFFF"]];
    }else{
        [cell.contentView setBackgroundColor:[ctdColorUtilities colorWithHexString:@"cfe9d0"]];
    }
    NSString *number = [NSString stringWithFormat:@"%d", indexPath.row+1];
    ctdResponseDailyAttendanceListModel *attendanceItem =[model.getDailyAttendanceListModels objectAtIndex:indexPath.row];
    
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
    nameLabel.text = attendanceItem.employeeName;
    nameLabel.textColor = [UIColor blackColor];
    nameLabel.textAlignment = NSTextAlignmentLeft;
    nameLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:nameLabel];
    
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(210.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:80];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    UILabel *employeeIdLabel =  [[UILabel alloc] initWithFrame:CGRectMake(205.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:90];
    employeeIdLabel.font = [UIFont systemFontOfSize:12.0];
    employeeIdLabel.text = attendanceItem.checkIn;
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
    projectIdLabel.text = attendanceItem.checkOut;
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
    totalAttendanceLabel.text = attendanceItem.previlage;
    totalAttendanceLabel.textColor = [UIColor blackColor];
    totalAttendanceLabel.textAlignment = NSTextAlignmentCenter;
    totalAttendanceLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:totalAttendanceLabel];
    
    return cell;}

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    
    // By default, allow row to be selected
    return indexPath;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    
}

-(NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
        return nil;
}

-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    return nil;
    
}



-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section {
    return 0;
}


-(CGFloat)tableView:(UITableView*)tableView heightForFooterInSection:(NSInteger)section
{
    return 0.01f;
}

-(UIView*)tableView:(UITableView*)tableView viewForFooterInSection:(NSInteger)section
{
    return nil;
}

// Override to support conditional editing of the table view.
// This only needs to be implemented if you are going to be returning NO
// for some items. By default, all items are editable.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    // Return YES if you want the specified item to be editable.
    return NO;
}

// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    
}


#pragma mark DailyAttendanceService methods
- (void)didReceivedDailyAttendanceResponse:(NSString*)response{
    ctdDailyAttendanceParser *parser = [[ctdDailyAttendanceParser alloc] init];
    model = [parser parseResponse:response];
    NSLog(@"JIJIJJIJ == %d",[model.getDailyAttendanceListModels count]);
    [itemAttendacen reloadData];
}

- (void)didReceiveDailyAttendanceErrorResponse:(NSError*)error{
    
}



- (NSDateFormatter *)dateFormatter
{
    static NSDateFormatter *dateFormatter = nil;
    if (dateFormatter == nil) {
        dateFormatter = [[NSDateFormatter alloc] init];
        [dateFormatter setDateStyle:NSDateFormatterMediumStyle];
        [dateFormatter setTimeStyle:NSDateFormatterNoStyle];
    }
    return dateFormatter;
}

- (IBAction)didDatePickerClicked:(id)sender{
    dateView.hidden = FALSE;
    datePicker.hidden = FALSE;
    toolbarDatePicker.hidden = FALSE;
}

- (IBAction)didDatePickerSaveBtnTypeClicked:(id)sender{
    dateString = [self paternDateForRequest:datePicker.date];
    dateTxt.text = [self.dateFormatter stringFromDate:datePicker.date];
    dateView.hidden = TRUE;
    datePicker.hidden = TRUE;
    toolbarDatePicker.hidden = TRUE;
}

- (IBAction)didDatePickerCancelBtnTypeClicked:(id)sender{
    dateView.hidden = TRUE;
    datePicker.hidden = TRUE;
    toolbarDatePicker.hidden = TRUE;
}

@end
