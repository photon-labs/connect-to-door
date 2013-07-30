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
#import "ctdConstants.h"

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
    [self configureAllComponent];
    
    dailyAttendanceService = [[ctdDailyAttendanceService alloc]init];
    dailyAttendanceService.delegate = self;
    
    updateAttendanceService = [[ctdUpdateAttendaceService alloc]init];
    updateAttendanceService.delegate = self;
    
    [self requestDailyAttendance:[self getEmployeeId] date:dateString];
    
    // Do any additional setup after loading the view from its nib.
}

/*@uathor:aldi_p
 *this method for handle request service daily attendance
 *
 */
-(void)requestDailyAttendance:(NSString*)employeeID date:(NSString*)date{
    [self showActivityIndicator];
    [dailyAttendanceService requestDailyAttendanceToServer:employeeID date:date];
}


-(void)updateAttendance:(NSString*)employeeID date:(NSString*)date checkInTime:(NSString*)checkInTime checkOutTime:(NSString*)checkOutTime{
    [self showActivityIndicator];
    [updateAttendanceService requestUpdateAttendanceToServer:[self getEmployeeId] date:date checkInTime:checkInTime checkOutTime:checkOutTime];
}

- (void)configureAllComponent{
    NSDate *today = [NSDate date];
    dateString = [self paternDateForRequest:today];
    dateTxt.text = dateString;
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
    
    ctdResponseDailyAttendanceListModel *attendanceItem =[model.getDailyAttendanceListModels objectAtIndex:indexPath.row];
    
    //label Number
    UILabel *numberLabel = [[UILabel alloc] initWithFrame:CGRectMake(0.0, 0, 33.0,tableView.rowHeight)];
    [cell addColumn:50];
    numberLabel.font = [UIFont systemFontOfSize:12.0];
    numberLabel.text = [NSString stringWithFormat:@"%d.", indexPath.row + 1];
    numberLabel.textColor = [UIColor blackColor];
    numberLabel.textAlignment = NSTextAlignmentCenter;
    numberLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:numberLabel];
    
    //Saparator Number
    UIImageView *separator = [[UIImageView alloc] initWithFrame:CGRectMake(34.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:60];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    //label name employee
    UILabel *nameLabel =  [[UILabel alloc] initWithFrame:CGRectMake(38, 0, 146.0,tableView.rowHeight)];
    [cell addColumn:70];
    nameLabel.font = [UIFont systemFontOfSize:12.0];
    nameLabel.text = attendanceItem.employeeName;
    nameLabel.textColor = [UIColor blackColor];
    nameLabel.textAlignment = NSTextAlignmentLeft;
    nameLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:nameLabel];
    
    //saparator name employee
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(310.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:80];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    //label checkin
    UILabel *checkinLabel =  [[UILabel alloc] initWithFrame:CGRectMake(305.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:90];
    checkinLabel.font = [UIFont systemFontOfSize:12.0];
    checkinLabel.text = attendanceItem.checkIn;
    checkinLabel.textColor = [UIColor blackColor];
    checkinLabel.textAlignment = NSTextAlignmentCenter;
    checkinLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:checkinLabel];
    
    //saparator checkin
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(382.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:100];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    //label checkout
    UILabel *checkoutLabel =  [[UILabel alloc] initWithFrame:CGRectMake(374.0, 0, 88.0,tableView.rowHeight)];
    [cell addColumn:110];
    checkoutLabel.font = [UIFont systemFontOfSize:12.0];
    checkoutLabel.text = attendanceItem.checkOut;
    checkoutLabel.textColor = [UIColor blackColor];
    checkoutLabel.textAlignment = NSTextAlignmentCenter;
    checkoutLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:checkoutLabel];
    
    //saparator checkout
    separator = [[UIImageView alloc] initWithFrame:CGRectMake(455.0, 0, 2.0,tableView.rowHeight)];
    [cell addColumn:120];
    [separator setBackgroundColor:[ctdColorUtilities colorWithHexString:@"86AA8E"]];
    [cell.contentView addSubview:separator];
    
    //label edit by
    UILabel *editByLabel =  [[UILabel alloc] initWithFrame:CGRectMake(465.0, 0, 86.0,tableView.rowHeight)];
    [cell addColumn:130];
    editByLabel.font = [UIFont systemFontOfSize:12.0];
    editByLabel.text = attendanceItem.previlage;
    editByLabel.textColor = [UIColor blackColor];
    editByLabel.textAlignment = NSTextAlignmentCenter;
    editByLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:editByLabel];
    
    return cell;}

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    
    // By default, allow row to be selected
    return indexPath;
}

-(CGFloat)tableView:(UITableView*)tableView heightForFooterInSection:(NSInteger)section
{
    return 0.01f;
}

// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    
}

- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the specified item to be editable.
    return YES;
}


- (BOOL)tableView:(UITableView *)tableView shouldIndentWhileEditingRowAtIndexPath:(NSIndexPath *)indexPath
{
    return NO;
}

- (NSString *)tableView:(UITableView *)tableView titleForDeleteConfirmationButtonForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    return @"Edit";
}

#pragma mark DailyAttendanceService methods
- (void)didReceivedDailyAttendanceResponse:(NSString*)response{
    [self hideActivityIndicator];
    ctdDailyAttendanceParser *parser = [[ctdDailyAttendanceParser alloc] init];
    model = [parser parseResponse:response];
    [itemAttendacen reloadData];
}

- (void)didReceiveDailyAttendanceErrorResponse:(NSError*)error{
    [self hideActivityIndicator];
    NSLog(@"ERROR RESPONSE : %@", error);
}


- (IBAction)didDatePickerClicked:(id)sender{
    datePickerActive = DATE_END;
    CGFloat dateEndX = CGRectGetMaxX(dateBtn.frame);
    CGFloat dateEndY = CGRectGetMaxY(dateBtn.frame);
    [self createPopUpCalendarWithValidation:dateEndX :dateEndY];
}

- (void) createPopUpCalendar :(CGFloat)positionX :(CGFloat)positionY
{
    calendar = [[CKCalendarView alloc] initWithStartDay:startMonday];
    calendar.delegate = self;
    
    calendar.onlyShowCurrentMonth = NO;
    calendar.adaptHeightToNumberOfWeeksInMonth = YES;
    
    calendar.frame = CGRectMake(positionX, positionY, 300, 320);
}

- (void) createPopUpCalendarWithValidation :(CGFloat)positionX :(CGFloat)positionY
{
    if([calendar isDescendantOfView:self.view]){
        [self removePopUp];
    } else {
        [self createPopUpCalendar:positionX :positionY];
        [self.view addSubview:calendar];
    }
}

- (void) removePopUp
{
    datePickerActive = @"";
    calendar.delegate = nil;
    [calendar removeFromSuperview];
    calendar = nil;
}

#pragma mark - CKCalendarDelegate
- (void)calendar:(CKCalendarView *)calendar didSelectDate:(NSDate *)date
{
    dateTxt.text = [self paternDateForRequest:date];
    [self removePopUp];
    [self requestDailyAttendance:[self getEmployeeId] date:[self paternDateForRequest:date]];
}

- (IBAction)didPrintClicked:(id)sender{
    [self showAlert:kAlertUnderConstruction];
}

#pragma mark - Update Attendance Service Delegate

- (void)didReceivedUpdateAttendanceResponse:(NSString*)response{
    [self hideActivityIndicator];
    
}

- (void)didReceiveUpdateAttendanceErrorResponse:(NSError*)error{
    [self hideActivityIndicator];
}


- (void)releaseDelegates{
    NSLog(@"masuk releaseDelegates ");
    dailyAttendanceService.delegate = nil;
    updateAttendanceService.delegate = nil;
    itemAttendacen.delegate = nil;
    itemAttendacen.dataSource = nil;
    calendar.delegate = nil;
    [super releaseDelegates];
}

- (void)invalidate{
    
}

@end
